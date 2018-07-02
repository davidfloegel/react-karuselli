import PropTypes from 'prop-types'

const Scrollable = ({ children }) => children
Scrollable.displayName = 'Scrollable'

Scrollable.propTypes = {
  children: PropTypes.array
}

Scrollable.defaultProps = {
  children: []
}

export default Scrollable
