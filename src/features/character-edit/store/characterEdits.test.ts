import { beforeEach, describe, expect, it } from 'vitest';
import { useCharacterEditsStore } from './characterEdits';

describe('characterEditsStore', () => {
  beforeEach(() => {
    localStorage.removeItem('sw-character-edits');
    useCharacterEditsStore.setState({ edits: {} });
  });

  it('stores and retrieves edits by character id', () => {
    const { setEdit, getEdit } = useCharacterEditsStore.getState();
    setEdit('1', { name: 'Luke Skywalker Jr.', height: '180' });
    expect(getEdit('1')).toEqual({ name: 'Luke Skywalker Jr.', height: '180' });
  });

  it('merges new edits with existing', () => {
    const { setEdit, getEdit } = useCharacterEditsStore.getState();
    setEdit('1', { name: 'Luke' });
    setEdit('1', { height: '180' });
    expect(getEdit('1')).toEqual({ name: 'Luke', height: '180' });
  });

  it('clearEdit removes edits for id', () => {
    const { setEdit, getEdit, clearEdit } = useCharacterEditsStore.getState();
    setEdit('1', { name: 'Luke' });
    setEdit('2', { name: 'Leia' });
    clearEdit('1');
    expect(getEdit('1')).toBeUndefined();
    expect(getEdit('2')).toEqual({ name: 'Leia' });
  });
});
