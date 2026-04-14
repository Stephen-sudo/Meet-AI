"use client";

import { z } from "zod";
import {
  useQueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { meetingInsertSchema } from "../../schema";
import { MeetingGetOne } from "../../types";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const [openNewAgentDialog, setOpenNewAgentDialog] =
    useState(false);
  const [agentSearch, setAgentSearch] = useState("");

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    }),
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );
        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({
              id: initialValues.id,
            }),
          );
        }
        onSuccess?.();
      },

      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );

        onSuccess?.(data?.id);
      },

      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const form = useForm<z.infer<typeof meetingInsertSchema>>(
    {
      resolver: zodResolver(meetingInsertSchema),
      defaultValues: {
        name: initialValues?.name ?? "",
        agentId: initialValues?.agentId ?? "",
      },
    },
  );

  const isEdit = !!initialValues?.id;
  const isPending =
    createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (
    values: z.infer<typeof meetingInsertSchema>,
  ) => {
    if (isEdit) {
      updateMeeting.mutate({
        id: initialValues?.id,
        ...values,
      });
    } else {
      createMeeting.mutate(values);
    }
  };
  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="eg. Math Consultation"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items ?? []).map(
                      (agent) => ({
                        id: agent.id,
                        value: agent.id,
                        children: (
                          <div className="flex items-center gap-x-2">
                            <GeneratedAvatar
                              seed={agent.name}
                              variant="botttsNeutral"
                              className="size-6 border"
                            />
                            <span>{agent.name}</span>
                          </div>
                        ),
                      }),
                    )}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    placeholder="Select an agent"
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  Not found what you&apos;re looking for?{" "}
                  <Button
                    type="button"
                    variant="link"
                    onClick={() =>
                      setOpenNewAgentDialog(true)
                    }
                  >
                    Create a new agent
                  </Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
