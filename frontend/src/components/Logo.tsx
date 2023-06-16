import { Image } from '@chakra-ui/react'

// FIXME: use SVG instead of PNG and change size with CSS
import logo128 from '../../src/img/therapy.png'
import logo16 from '../../src/img/therapy.png'
import logo24 from '../../src/img/therapy.png'
import logo256 from '../../src/img/therapy.png'
import logo32 from '../../src/img/therapy.png'
import logo512 from '../../src/img/therapy.png'
import logo64 from '../../src/img/therapy.png'

import { TEXT_IMAGE_ALT_LOGO } from '../localization/texts'

type LogoProps = {
  boxSize: string
}

export const Logo = ({ boxSize = 'md' }: LogoProps) => {
  const getBoxSize = (): string => {
    if (boxSize === 'xs') return '24'
    if (boxSize === 'sm') return '32'
    if (boxSize === 'md') return '64'
    if (boxSize === 'lg') return '128'
    if (boxSize === 'xl') return '256'
    if (boxSize === '2xl') return '512'
    return '16'
  }

  const getLogo = (): string => {
    if (boxSize === 'xs') return logo24
    if (boxSize === 'sm') return logo32
    if (boxSize === 'md') return logo64
    if (boxSize === 'lg') return logo128
    if (boxSize === 'xl') return logo256
    if (boxSize === '2xl') return logo512
    return logo16
  }

  return <Image boxSize={`${getBoxSize()}px`} src={getLogo()} alt={TEXT_IMAGE_ALT_LOGO} />
}
