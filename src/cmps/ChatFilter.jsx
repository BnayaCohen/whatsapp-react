import { Component } from 'react'
import { ReactComponent as SearchIcon } from '../assets/imgs/SearchIcon.svg'

export class ChatFilter extends Component {

  state = {
    term: '',
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.value
    this.setState({ [field]: value }, () => {
      this.props.onChangeFilter({ ...this.state })
    })
  }

  render() {
    const { term } = this.state
    return (
      <section className='chat-filter'>
        <form className='input-container'>
          <div className='search-icon'>
            <SearchIcon />
          </div>
          <input value={term} onChange={this.handleChange} type="text" name="term" placeholder='Search' />
        </form>
      </section>
    )
  }
}
