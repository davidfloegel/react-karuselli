// @flow

import _ from 'lodash'

/**
 * Return the correct size string for a given window width
**/
export function determineScreenSize(windowWidth: Number, sizeClasses: Object): string {
  let foundSize = 'xs'

  _.forEach(sizeClasses, (pixels, sizeClass) => {
    if (windowWidth >= pixels) {
      foundSize = sizeClass
    }
  })

  return foundSize
}
