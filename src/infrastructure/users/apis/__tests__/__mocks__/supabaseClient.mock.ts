/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";

export function createSupabaseMock() {
  const calls = { last: null as any };
  let nextResult: any = { data: [], count: 0, error: null };

  const auth = {
    signUp: vi.fn(),
  };

  function makeChain(table: string) {
    const state = {
      table,
      selectArgs: [] as any[],
      eqArgs: [] as any[],
      orderArgs: [] as any[],
      rangeArgs: [] as any[],
      orArg: null as any,
      updatePayload: null as any,
      insertPayload: null as any,
    };
    calls.last = state;

    const chain: any = {
      select: (...args: any[]) => {
        state.selectArgs.push(args);
        return chain;
      },
      eq: (k: string, v: any) => {
        state.eqArgs.push([k, v]);
        return chain;
      },
      order: (c: string, o: any) => {
        state.orderArgs.push([c, o]);
        return chain;
      },
      range: (from: number, to: number) => {
        state.rangeArgs.push([from, to]);
        return chain;
      },
      or: (expr: string) => {
        state.orArg = expr;
        return chain;
      },
      update: (payload: any) => {
        state.updatePayload = payload;
        return chain;
      },
      insert: (payload: any) => {
        state.insertPayload = payload;
        return { error: nextResult.error ?? null };
      },
      then: (resolve: any) => resolve(nextResult),
    };
    return chain;
  }

  const from = vi.fn((table: string) => makeChain(table));

  const supabase = {
    auth,
    from,
    __getLast: () => calls.last,
    __setNextResult: (r: any) => {
      nextResult = r;
    },
    __reset: () => {
      calls.last = null;
      nextResult = { data: [], count: 0, error: null };
      auth.signUp.mockReset();
      from.mockReset();
    },
  };

  return supabase;
}
