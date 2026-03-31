'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import type { Profile, Team } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (e) {
        console.error('Auth error:', e);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setTeam(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        setProfile(null);
        setTeam(null);
        return;
      }
      
      if (data) {
        setProfile(data);
        if (data.team_id) {
          const { data: teamData } = await supabase
            .from('teams')
            .select('*')
            .eq('id', data.team_id)
            .single();
          setTeam(teamData ?? null);
        }
      }
    } catch (e) {
      console.error('Profile error:', e);
      setProfile(null);
      setTeam(null);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw error;
    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setTeam(null);
  };

  const createTeam = async (teamName: string) => {
    const { data, error } = await supabase
      .from('teams')
      .insert({ name: teamName })
      .select()
      .single();
    if (error) throw error;

    if (user) {
      await supabase
        .from('profiles')
        .update({ team_id: data.id })
        .eq('id', user.id);
    }

    setTeam(data);
    setProfile(prev => prev ? { ...prev, team_id: data.id } : null);
    return data;
  };

  const joinTeam = async (joinCode: string) => {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('join_code', joinCode.toLowerCase().trim())
      .single();
    if (error || !data) throw new Error('팀 코드를 찾을 수 없습니다');

    if (user) {
      await supabase
        .from('profiles')
        .update({ team_id: data.id })
        .eq('id', user.id);
    }

    setTeam(data);
    setProfile(prev => prev ? { ...prev, team_id: data.id } : null);
    return data;
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
    if (error) throw error;
    setProfile(prev => prev ? { ...prev, ...updates } : null);
  };

  return {
    user, profile, team, loading,
    signUp, signIn, signOut,
    createTeam, joinTeam, updateProfile,
  };
}
