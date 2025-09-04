"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background Job Started");
      },
    })
  );

  return (
    <div className="p-4">
      <Button disabled={invoke.isPending} onClick={() => invoke.mutate({ text: "Test" })}>
        Invoke Background Job
      </Button>
    </div>
  );
};

export default Page;
