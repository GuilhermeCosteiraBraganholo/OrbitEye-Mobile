import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAlert, createRegion, deleteAlert, deleteRegion, getDashboard, listAlerts, listEvents, listPredictions, listRegions, updateAlert, updateRegion } from './api';

export function useRegions() { return useQuery({ queryKey: ['regions'], queryFn: listRegions }); }
export function useAlerts() { return useQuery({ queryKey: ['alerts'], queryFn: listAlerts }); }
export function useEvents() { return useQuery({ queryKey: ['events'], queryFn: listEvents }); }
export function usePredictions() { return useQuery({ queryKey: ['predictions'], queryFn: listPredictions }); }
export function useDashboard() { return useQuery({ queryKey: ['dashboard'], queryFn: getDashboard }); }

export function useCreateRegion() { const qc = useQueryClient(); return useMutation({ mutationFn: createRegion, onSuccess: () => { qc.invalidateQueries({ queryKey: ['regions'] }); qc.invalidateQueries({ queryKey: ['dashboard'] }); } }); }
export function useUpdateRegion() { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, payload }: any) => updateRegion(id, payload), onSuccess: () => { qc.invalidateQueries({ queryKey: ['regions'] }); qc.invalidateQueries({ queryKey: ['dashboard'] }); } }); }
export function useDeleteRegion() { const qc = useQueryClient(); return useMutation({ mutationFn: deleteRegion, onSuccess: () => { qc.invalidateQueries({ queryKey: ['regions'] }); qc.invalidateQueries({ queryKey: ['dashboard'] }); } }); }
export function useCreateAlert() { const qc = useQueryClient(); return useMutation({ mutationFn: createAlert, onSuccess: () => { qc.invalidateQueries({ queryKey: ['alerts'] }); qc.invalidateQueries({ queryKey: ['dashboard'] }); } }); }
export function useUpdateAlert() { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, payload }: any) => updateAlert(id, payload), onSuccess: () => { qc.invalidateQueries({ queryKey: ['alerts'] }); qc.invalidateQueries({ queryKey: ['dashboard'] }); } }); }
export function useDeleteAlert() { const qc = useQueryClient(); return useMutation({ mutationFn: deleteAlert, onSuccess: () => { qc.invalidateQueries({ queryKey: ['alerts'] }); qc.invalidateQueries({ queryKey: ['dashboard'] }); } }); }
