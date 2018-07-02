// @flow

import _ from 'lodash'

/**
 * Definition of screen sizes at which we break into a different layout.
 * @type {Object}
 */
const RESPONSIVE_THRESHOLDS = {
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
