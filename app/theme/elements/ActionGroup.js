import { css } from 'styled-components'

export default {
  Root: css`
    > * {
      &:last-child {
        border-right: 0;
      }
    }
  `,
  ActionWrapper: css`
    font-size: 5px;
  `,
}
