import * as React from 'react'
import { css } from 'linaria'
import { FlexContainer, Flex } from '../layout'
import { Button } from '../buttons'
import { colors } from '../../styles'

interface IndexProps {
  onSubmit: () => void
  onCancel: () => void
  cancelButtonText?: string
  submitButtonText?: string
}

const modalBGClassname = css`
  z-index: 9;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`

const modalFGClassname = css`
  z-index: 10;
  width: 500px;
  max-width: 90%;
  min-height: 50%;
  max-height: 90%;
  background: ${colors.cream};
  border-radius: 6px;
  padding: 16px 0px;
`

const contentClassname = css`
  flex: 1;
`

const footerClassname = css`
  justify-self: flex-end;
`

class Index extends React.Component<IndexProps> {
  public static defaultProps = {
    cancelButtonText: 'Cancel',
    submitButtonText: 'Okay'
  }

  render() {
    const { children, cancelButtonText, submitButtonText, onSubmit, onCancel } = this.props
    return (
      <div className={modalBGClassname}>
        <FlexContainer
          justifyContent='center'
          direction='column'
          className={modalFGClassname}
        >
          <Flex column={12} className={contentClassname}>
            {children}
          </Flex>
          <FlexContainer direction='row' className={footerClassname}>
            <FlexContainer justifyContent='flex-end' column={6}>
              <Button onClick={onCancel}>{cancelButtonText}</Button>
            </FlexContainer>
            <Flex column={6}>
              <Button onClick={onSubmit} color='success'>{submitButtonText}</Button>
            </Flex>
          </FlexContainer>
        </FlexContainer>
      </div>
    )
  }
}

export default Index
