import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground text-sm">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page === 1}
          variant="outline"
          size="sm"
          onClick={() =>
            onPageChange(Math.max(page - 1, 1))
          }
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={page === totalPages || totalPages === 0}
          onClick={() =>
            onPageChange(Math.min(page + 1, totalPages))
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};
