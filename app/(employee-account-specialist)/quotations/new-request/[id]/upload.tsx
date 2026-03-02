import Upload from "@/src/components/as-quotation/Upload";

export default function UploadQuotation() {
  return (
    <Upload
      submitButtonText="Send Quotation"
      confirmModalTitle="Send Quotation?"
      confirmModalDescription="You’re about to send this quotation to the client. Please review all details carefully. Changes after sending will require a revised quotation."
    />
  );
}
