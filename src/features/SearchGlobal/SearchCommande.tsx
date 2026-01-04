import CommandSearchContent from "@/features/SearchGlobal/CommandSearchContent";
import CommandPalette from "@/components/utils/CommandPalette";
import {
  useGlobalSearch,
  type GlobalSearchScope,
} from "@/hooks/use-global-search";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
const SCOPES: { key: GlobalSearchScope; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "produits", label: "Produits" },
  { key: "categories", label: "Catégories" },
  { key: "marques", label: "Marques" },
  { key: "clients", label: "Clients" },
  { key: "commandes", label: "Commandes" },
  { key: "avis", label: "Pages" },
];


const SearchCommande = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [debounced] = useDebounce(query, 250);
  const [scope, setScope] = useState<GlobalSearchScope>("all");
  const { data, isFetching } = useGlobalSearch(debounced, scope);
  const results = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data.items && Array.isArray(data.items)) return data.items;
    return [];
  }, [data]);
console.log(
  results
);

  return (
    <CommandPalette
      inverted
      inputProps={{
        value: query,
        onValueChange: (v: string) => setQuery(v),
        placeholder: "Rechercher produits, catégories, marques...",
      }}
    >
      <CommandSearchContent
        query={query}
        scope={scope}
        setScope={setScope}
        results={results}
        isFetching={isFetching}
        onItemSelect={(r) => {
          try {
            const url = r.url || (r.type === "product" ? `/product/${r.id}` : r.url);
            if (url) navigate(url);
          } catch (e) {}
        }}
        onQuickAction={() => navigate("/admin/products/ajouter")}
        scopes={SCOPES}
      />
    </CommandPalette>
  );
};

export default SearchCommande;
