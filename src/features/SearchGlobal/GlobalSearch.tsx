import useGlobalSearch, { type GlobalSearchScope } from "@/hooks/use-global-search";
import {  Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const SCOPES: { key: GlobalSearchScope; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "produits", label: "Produits" },
  { key: "categories", label: "Catégories" },
  { key: "marques", label: "Marques" },
  { key: "clients", label: "Clients" },
  { key: "commandes", label: "Commandes" },
  { key: "avis", label: "Commentaire ou avis" },
];

function highlight(text: string, q: string) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.substring(0, idx)}
      <span className="bg-yellow-100">{text.substring(idx, idx + q.length)}</span>
      {text.substring(idx + q.length)}
    </>
  );
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debounced] = useDebounce(query, 250);
  const [scope, setScope] = useState<GlobalSearchScope>("all");


  const { items:data, isFetching } = useGlobalSearch(debounced, scope);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((s) => !s);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => data || [], [data]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 border rounded-md px-3 py-1 bg-white"
        >
          <Search size={16} /> Rechercher (Cmd+K)
        </button>
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-[520px] bg-white border rounded shadow-lg p-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher produits, catégories, marques..."
              className="flex-1 px-3 py-2 border rounded"
            />
            <button className="px-3 py-2 text-sm" onClick={() => { setQuery(""); setOpen(false); }}>
              Fermer
            </button>
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            {SCOPES.map((s) => (
              <button
                key={s.key}
                onClick={() => setScope(s.key)}
                className={`px-2 py-1 rounded ${scope === s.key ? "bg-gray-200" : "bg-white"}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="mt-3 max-h-60 overflow-auto">
            {isFetching && <div className="p-2">Chargement...</div>}
            {!isFetching && results.length === 0 && (
              <div className="p-2 text-sm text-muted-foreground">Aucun résultat</div>
            )}

            <ul className="divide-y">
              {results.map((r: any, idx: number) => (
                <li key={idx} className="p-2 hover:bg-gray-50 cursor-pointer">
                  <div className="text-sm font-medium">{highlight(r.title || r.titre || r.name || r.slug || "-", query)}</div>
                  {r.message && <div className="text-xs text-gray-500">{r.message}</div>}
                  <div className="text-xs text-muted-foreground">{r.type || r.scope || r.category || r.brand}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
