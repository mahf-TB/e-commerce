import BadgeButton from "@/components/BadgeButton";
import Dropdown, { DropdownItems } from "@/components/dropdown";
import { Button } from "@/components/ui/button";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { changeStatutProduct } from "@/services/produitService";
import {
  EllipsisIcon,
  HardDriveUploadIcon,
  PenBox,
  Printer,
  Shield,
  ShieldOff,
  Trash,
} from "lucide-react";
import React from "react";

type ActionDetailsProps = {
  id: string | number;
  statut: string;
};

const ActionDetails = ({ id, statut }: ActionDetailsProps) => {
  return (
    <div className="flex gap-4 font-poppins">
      <Button
        variant={"outline"}
        className="flex items-center gap-1 rounded bg-gray-950 hover:bg-gray-950/80 hover:text-white  text-white px-2 py-2"
      >
        <PenBox size={18} />
        <span className="">Modifier</span>
      </Button>
      <Button
        className="flex items-center gap-1 rounded  px-2 py-2"
        variant={"outline"}
      >
        <Printer size={18} />
        <span className="">Imprimer</span>
      </Button>
      <Dropdown
        btnShow={
          <BadgeButton className="rounded" size={"icon"} icon={EllipsisIcon} />
        }
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownItems
          icon={<HardDriveUploadIcon size={18} />}
          title="Modifier l'image"
          // onClick={() =>  onEdit(id)}
        />
        {statut === "active" ? (
          <DropdownItems
            icon={<ShieldOff size={18} />}
            title="Désactiver"
            onClick={() => changeStatutProduct(id, { statut: "inactive" })}
          />
        ) : (
          <DropdownItems
            icon={<Shield size={18} />}
            title="Activer"
            onClick={() => changeStatutProduct(id, { statut: "active" })}
          />
        )}

        <DropdownItems
          icon={<Trash size={18} />}
          title="Supprimer"
          variant="destructive"
          onClick={() => changeStatutProduct(id, { statut: "archived" })}
        />
      </Dropdown>
    </div>
  );
};

export default ActionDetails;
