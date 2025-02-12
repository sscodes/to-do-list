import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskKeys } from '../query-key-factory';
import { TaskService } from './tasks.service';

const taskServices = new TaskService();

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: ({task, token}) => {
        return taskServices.createTask(task, token)},
      onSuccess: () => {
        queryClient.invalidateQueries(taskKeys.readTasks);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );
};

export const useReadTask = (token) => {
  const res = useQuery({
    queryKey: taskKeys.readTasks,
    queryFn: () => taskServices.readTask(token),
  });

  return {
    tasks: res.data,
    isPending: res.isPending,
    isError: res.isError,
  };
};

export const updateTask = (params) => {};

export const deleteTask = (params) => {};
