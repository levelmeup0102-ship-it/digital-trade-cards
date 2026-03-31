'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import type { CardResponse } from '@/types';

export function useCardData(teamId: string | null) {
  const [responses, setResponses] = useState<Record<string, CardResponse>>({});
  const [checkStates, setCheckStates] = useState<Record<string, Record<number, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  // Load all responses and progress for this team
  useEffect(() => {
    if (!teamId) return;
    loadAll();
  }, [teamId]);

  const loadAll = async () => {
    if (!teamId) return;
    setLoading(true);

    // Load responses
    const { data: resData } = await supabase
      .from('card_responses')
      .select('*')
      .eq('team_id', teamId);

    if (resData) {
      const mapped: Record<string, CardResponse> = {};
      resData.forEach((r: any) => {
        mapped[r.card_id] = { texts: r.texts || {}, images: r.images || {} };
      });
      setResponses(mapped);
    }

    // Load checklist progress
    const { data: progData } = await supabase
      .from('card_progress')
      .select('*')
      .eq('team_id', teamId);

    if (progData) {
      const mapped: Record<string, Record<number, boolean>> = {};
      progData.forEach((p: any) => {
        mapped[p.card_id] = p.checklist_status || {};
      });
      setCheckStates(mapped);
    }

    setLoading(false);
  };

  // Save response for a card
  const saveResponse = useCallback(async (cardId: string, data: CardResponse) => {
    // Update local state immediately
    setResponses(prev => ({ ...prev, [cardId]: data }));

    if (!teamId) return;
    setSaving(true);

    const { error } = await supabase
      .from('card_responses')
      .upsert({
        team_id: teamId,
        card_id: cardId,
        texts: data.texts,
        images: data.images,
      }, { onConflict: 'team_id,card_id' });

    setSaving(false);
    if (error) console.error('Save response error:', error);
  }, [teamId]);

  // Toggle checklist item
  const toggleCheck = useCallback(async (cardId: string, itemIndex: number) => {
    const current = checkStates[cardId] || {};
    const updated = { ...current, [itemIndex]: !current[itemIndex] };

    setCheckStates(prev => ({ ...prev, [cardId]: updated }));

    if (!teamId) return;

    await supabase
      .from('card_progress')
      .upsert({
        team_id: teamId,
        card_id: cardId,
        checklist_status: updated,
      }, { onConflict: 'team_id,card_id' });
  }, [teamId, checkStates]);

  const hasResponse = (cardId: string) => {
    const r = responses[cardId];
    return r && Object.values(r.texts || {}).some(t => t?.trim());
  };

  return {
    responses, checkStates, loading, saving,
    saveResponse, toggleCheck, hasResponse, loadAll,
  };
}
