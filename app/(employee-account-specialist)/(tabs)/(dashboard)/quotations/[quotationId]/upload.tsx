import Upload from "@/components/as-quotation/Upload";
import type { QuotationStatus } from "@/types/quotations";
import { useLocalSearchParams } from "expo-router";

export default function QuotationUpload() {
  const { status } = useLocalSearchParams<{
    status?: Lowercase<QuotationStatus>;
  }>();

  if (status === "responded") {
    return (
      <Upload
        submitButtonText="Re-send Quotation"
        confirmModalTitle="Are you sure you want to update quotation?"
        confirmModalDescription="This action will replace the previous quotation sent in the client account. Please proceed with caution."
      />
    );
  }

  return (
    <Upload
      submitButtonText="Send Quotation"
      confirmModalTitle="Send Quotation?"
      confirmModalDescription="You’re about to send this quotation to the client. Please review all details carefully. Changes after sending will require a revised quotation."
    />
  );
}
