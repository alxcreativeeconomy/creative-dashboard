import { useEffect, useReducer } from 'react';

function extractSheetId(url) {
  const match = url?.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

function parseCSVRow(line) {
  const cols = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '"') {
      inQuotes = !inQuotes;
    } else if (line[i] === ',' && !inQuotes) {
      cols.push(current.trim());
      current = '';
    } else {
      current += line[i];
    }
  }
  cols.push(current.trim());
  return cols;
}

// Default parser — expected columns: Metric | Target | Current | Previous | WoW% | Progress% | Comments
export function parseWeeklyMetrics(rows) {
  return rows
    .filter(cols => cols[0]?.trim())
    .map(cols => ({
      metric:   cols[0] || '',
      target:   cols[1] || '',
      current:  cols[2] || '',
      previous: cols[3] || '',
      wow:      cols[4] || '0%',
      progress: parseFloat(cols[5]) || 0,
      comments: (cols[6] || '').replace(/\\n/g, '\n'),
    }));
}

function reducer(state, action) {
  switch (action.type) {
    case 'SUCCESS': return { ...state, data: action.data, loading: false, error: null,         isLive: true  };
    case 'ERROR':   return { ...state,                    loading: false, error: action.error, isLive: false };
    default:        return state;
  }
}

/**
 * Fetches a Google Sheets tab as CSV and parses it.
 *
 * @param {string|null} gid      - The sheet tab GID (set VITE_WEEKLY_METRICS_GID in .env)
 * @param {Array}       fallback - Hardcoded data used while loading or on error
 * @param {Function}    parser   - Maps raw CSV rows to data array
 */
export function useSheetCSV(gid, fallback, parser = parseWeeklyMetrics) {
  const sheetId    = extractSheetId(import.meta.env.VITE_SHEETS_URL);
  const canFetch   = !!(sheetId && gid);

  const [state, dispatch] = useReducer(reducer, {
    data:    fallback,
    loading: canFetch,   // starts true only when we have config to fetch
    error:   null,
    isLive:  false,
  });

  useEffect(() => {
    if (!canFetch) return;

    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Sheets returned HTTP ${res.status}`);
        return res.text();
      })
      .then(text => {
        const lines = text.trim().split('\n');
        if (lines.length < 2) throw new Error('Sheet appears empty');
        const rows   = lines.slice(1).map(parseCSVRow);
        const parsed = parser(rows);
        if (parsed.length === 0) throw new Error('No parseable rows found');
        dispatch({ type: 'SUCCESS', data: parsed });
      })
      .catch(err => dispatch({ type: 'ERROR', error: err.message }));
  }, [gid, sheetId, canFetch]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
