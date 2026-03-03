import Upload from "@/src/components/as-quotation/Upload";

export default function UploadQuotation() {
  return (
    <Upload
      submitButtonText="Re-send Quotation"
      confirmModalTitle="Are you sure you want to update quotation?"
      confirmModalDescription="This action will replace the previous quotation sent in the client account. Please proceed with caution."
    />
  );
}
