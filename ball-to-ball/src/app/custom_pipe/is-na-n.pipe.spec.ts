import { IsNaNPipe } from './is-na-n.pipe';

describe('IsNaNPipe', () => {
  it('create an instance', () => {
    const pipe = new IsNaNPipe();
    expect(pipe).toBeTruthy();
  });
});
