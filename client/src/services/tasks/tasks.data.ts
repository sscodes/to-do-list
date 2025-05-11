import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskKeys } from '../query-key-factory';
import { TaskService } from './tasks.service';
import { TaskChanges } from '@/types/tasks';
import { Value as DateValue } from 'node_modules/react-calendar/dist/esm/shared/types';

const taskServices = new TaskService();

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      task,
      token,
    }: {
      task: {
        user: string;
        taskName: string;
        taskDetail: string;
        deadline: DateValue;
        done: boolean;
      };
      token: string;
    }) => {
      return taskServices.createTask({task, token});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.readTasks() });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useReadTask = (token: string) => {
  const res = useQuery({
    queryKey: taskKeys.readTasks(),
    queryFn: () => taskServices.readTask(token),
    enabled: !!token,
  });

  return {
    tasks: res?.data ?? [],
    isPending: res.isPending,
    isError: res.isError,
  };
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      change,
      token,
      id,
    }: {
      change: TaskChanges | { done: boolean };
      token: string;
      id: string;
    }) => {
      return taskServices.updateTask({change, token, id});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.readTasks() });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: string }) => {
      return taskServices.deleteTask({token, id});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.readTasks() });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
