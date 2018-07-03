// @flow

import _ from 'lodash'

export const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right'
}

/**
 * Definition of key codes to scroll Karuselli using keyboard
 */
export const ARROW_KEYS = {
  LEFT: 37,
  RIGHT: 39
}

/**
 * Definition of screen sizes at which we break into a different layout.
 * @type {Object}
 */
export const RESPONSIVE_THRESHOLDS = {
  sm: 768,
  md: 992,
  lg: 1200
}

/**
 * Return the correct size string for a given window width
**/
export function determineScreenSize(windowWidth: Number): string {
  let foundSize = 'xs'

  _.forEach(RESPONSIVE_THRESHOLDS, (pixels, sizeClass) => {
    if (windowWidth >= pixels) {
      foundSize = sizeClass
    }
  })

  return foundSize
}

/**
 * Determine how many cards should be displayed on screen based on what the user has defined
 *
 * @param  {Number|Object} visibleItems
 * @param  {Number}        windowWidth
 * @return {Number}
 */
export function getNumberOfVisibleItems(visibleItems: Number | Object, windowWidth: Number) {
  if (_.isNumber(visibleItems)) {
    return visibleItems
  }

  const sizeString = determineScreenSize(window.innerWidth)

    if (_.get(visibleItems, sizeString)) {
      return visibleItems[sizeString]
    }

    return _.get(visibleItems, _.last(_.keys(visibleItems)))
}

