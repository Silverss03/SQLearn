import { render, screen } from '@testing-library/react';
import { Checkbox } from '..';

describe('Checkbox', () => {
  describe('背景色がチェックアイコンの色と同じとき', () => {
    render(<Checkbox invertColors />);

    it('Checkboxに枠線がつく', () => {
      expect(
        screen.getByTestId('checkbox-inverted-border')
      ).toBeInTheDocument();
    });
  });
});
