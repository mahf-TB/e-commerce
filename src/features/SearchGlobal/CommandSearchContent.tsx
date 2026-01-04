import React from "react";

import type { GlobalSearchScope } from "@/hooks/use-global-search";

export interface CommandSearchContentProps {
  query: string;
  scope: GlobalSearchScope;
  setScope: (s: GlobalSearchScope) => void;
  results: any[];
  isFetching: boolean;
  onItemSelect?: (item: any) => void;
  onQuickAction?: () => void;
  scopes?: { key: GlobalSearchScope; label: string }[];
}

function highlight(text: string, q: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.substring(0, idx)}
      <span className="bg-yellow-100">
        {text.substring(idx, idx + q.length)}
      </span>
      {text.substring(idx + q.length)}
    </>
  );
}


export default function CommandSearchContent({
  query,
  scope,
  setScope,
  results,
  isFetching,
  onItemSelect,
  onQuickAction,
  scopes,
}: CommandSearchContentProps) {
  return (
    <div className="px-2">
      <div className="mb-2">
        <div className="text-xs text-muted-foreground mb-1">Filtres</div>
        <div className="flex flex-nowrap gap-2">
          {(scopes || []).map((s) => (
            <button
              key={s.key}
              onClick={() => setScope(s.key)}
              className={`px-2 py-1 rounded border ${scope === s.key ? "bg-gray-200" : "bg-white"}`}
            >
              <span className="text-sm">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t pt-2">
        {isFetching ? (
          <div className="p-2 text-sm">Chargement...</div>
        ) : results.length === 0 ? (
          <div className="p-2 text-sm text-muted-foreground">Aucun résultat</div>
        ) : (
          <div className="space-y-1">
            {results.map((r: any, idx: number) => (
              <button
                key={idx}
                onClick={() => onItemSelect?.(r)}
                className="w-full text-left p-2 rounded hover:bg-gray-50"
              >
                <div className="text-sm font-medium">
                  {highlight(r.title || r.titre || r.name || r.slug || "-", query)}</div>
                {r.message && <div className="text-xs text-gray-500">{r.message}</div>}
                <div className="text-xs text-muted-foreground">{r.type || r.scope || r.category || r.brand}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t mt-2 pt-2">
        <div className="text-xs text-muted-foreground mb-1">Actions rapides</div>
        <div>
          <button onClick={() => onQuickAction?.()} className="px-3 py-1 rounded bg-blue-600 text-white">Ajouter un produit</button>
        </div>
      </div>
    </div>
  );
}
