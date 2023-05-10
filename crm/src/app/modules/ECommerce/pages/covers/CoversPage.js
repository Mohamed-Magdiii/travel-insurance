import React from "react";
// import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
// import { ProductDeleteDialog } from "./product-delete-dialog/ProductDeleteDialog";
// import { ProductsDeleteDialog } from "./products-delete-dialog/ProductsDeleteDialog";
// import { ProductsFetchDialog } from "./products-fetch-dialog/ProductsFetchDialog";
// import { ProductsUpdateStatusDialog } from "./products-update-status-dialog/ProductsUpdateStatusDialog";
import { CoversCard } from "./CoversCard";
import { CoversUIProvider } from "./CoversUIContext"; //done

export function CoversPage({ history }) {
  const CoversUIEvents = {
    newCoverButtonClick: () => {
      history.push("/setup/covers/new");
    },
    openEditCoverPage: (id) => {
      history.push(`/setup/covers/${id}/edit`);
    },
    openDeleteCoverDialog: (id) => {
      history.push(`/setup/covers/${id}/delete`);
    },
    openDeleteCoversDialog: () => {
      history.push(`/setup/covers/deleteProducts`);
    },
    openFetchCoversDialog: () => {
      history.push(`/setup/covers/fetch`);
    },
    openUpdateCoversStatusDialog: () => {
      history.push("/setup/covers/updateStatus");
    },
  };

  return (
    <CoversUIProvider coversUIEvents={CoversUIEvents}>
     
      <CoversCard />
    </CoversUIProvider>
  );
}
