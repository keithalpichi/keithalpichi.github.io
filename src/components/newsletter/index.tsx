import * as React from 'react'
import { Modal } from '../index'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import TextInput from '../inputs/textinput'
import SubmitInput from '../inputs/submitinput'
import { validEmail } from '../../util'
import { colors } from '../../styles'

interface IndexState {
  showModalConfirmation: boolean
  email: string
  firstname: string
  error: null | string
}

class Index extends React.Component<{}, IndexState> {
  state = {
    showModalConfirmation: false,
    email: '',
    firstname: '',
    error: null
  }

  triggerError = (error: string) => {
    this.setState({ error }, () => setTimeout(() => this.setState({ error: null }), 3000))
  }

  handleFormFieldChange = (e: React.SyntheticEvent) => {
    const { value, name } = e.target as HTMLInputElement
    switch (name) {
      case 'email':
        return this.setState({ email: value })
      case 'firstname':
        return this.setState({ firstname: value })
      default:
        return
    }
  }

  handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const { email, firstname } = this.state
      if (!validEmail(email)) {
        throw new Error('Email provided is not a valid email')
      }
      if (firstname.length === 0) {
        throw new Error('First name provided must be provided')
      }
      await addToMailchimp(email, { FNAME: firstname })
      this.setState({ firstname: '', email: '', showModalConfirmation: true, error: null })
    } catch (error) {
      this.triggerError(error.message)
    }
  }

  closeModal = () => this.setState({ showModalConfirmation: false })

  render () {
    const { showModalConfirmation, email, firstname, error } = this.state
    return (
      <React.Fragment>
        {showModalConfirmation && (
          <Modal onCancel={this.closeModal} onSubmit={this.closeModal}>
            <h2 style={{ textAlign: 'center' }}>Welcome to the "Aloha, World" Club!</h2>
            <p>Please check your email to confirm your subscription.  I love to hear my from readers so feel free to reply with "Aloha" and introduce yourself.</p>
          </Modal>
        )}
        <form onSubmit={this.handleSubmit}>
          <TextInput
            placeholder='Email (required)'
            type='text'
            name='email'
            value={email}
            onChange={this.handleFormFieldChange}
          />
          <TextInput
            placeholder='First Name (required)'
            type='text'
            name='firstname'
            value={firstname}
            onChange={this.handleFormFieldChange}
          />
          <SubmitInput
            type='submit'
            value='Sign Up'
          />
          {error && <p style={{ color: colors.salmon, fontSize: '.75em' }}>{error}</p>}
        </form>
      </React.Fragment>
    )
  }
}

export default Index
