import _ from 'lodash'
import React from 'react'
import styled, { css } from 'styled-components'

import Karuselli from '../../lib'

const IMAGES = [
  'https://images.unsplash.com/photo-1475744214834-0cb9be6eb226?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=35d21091ad60e51e8f62b91cd193eecc&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98bfb6da87072431cb1d54750bf2e638&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2fb8b0a55fc0a9a390e5ebf78492f154&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1482627750753-afdba16659ef?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=367ee76c11aa11fc0a52477a6a61e562&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a2e3abeff94d9a95db8c3b25e84f3718&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1453090927415-5f45085b65c0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a281f105ebc13c0450a98c2e9b681fcc&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f9f0fdc18a215ec725f8ca61dc6fcbdf&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3dd4e03b7ee0a4a60d5f34e0cc11a66c&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1502773860571-211a597d6e4b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5fcf0743cc56b2325dea10c979722b9d&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1431069767777-c37892aa0a07?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c3a556a7c67a4fe290e9336a9703ed61&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=032360c7b684868000973387b861b854&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=96b6eb1c3bac5a2a548d7f90020bef2f&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a560d668d4e1af8675f367dc344a08c&auto=format&fit=crop&w=800&q=60'
]

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`

const Subtitle = styled.div`
  font-size: 14px;
  color: #ccc;
  margin-bottom: 30px;
`

const ImgWrapper = styled.div`
  background: ${({ bg }) => bg};
  max-width: 100%;
  padding: 30% 0;
  border-radius: 5px;
  text-align: center;
  color: white;
  position: relative;
  border-radius: 3px;
  overflow: hidden;
`

const Img = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`

const Arrow = styled.button`
  ${({ isLeft, isRight }) => css`
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background: #fff;
    border: 1px solid #aaa;
    color: #000;
    font-size: 20px;
    position: absolute;
    z-index: 1;
    top: 50%;
    margin-top: -20px;

    &:active, &:focus {
      outline: none;
    }

    &:active {
      border-color: #2980b9;
      color: #2980b9;
    }

    &:disabled {
      border-color: #ccc;
      color: #ccc;
    }

    ${isLeft && css`
      left: -20px;
    `}

    ${isRight && css`
      right: -20px;
    `}
  `}
`

export default () => (
  <div>
    <Title>Image Slider</Title>
    <Subtitle>Some beautiful images with a different type of arrows</Subtitle>

    <Karuselli visibleItems={{ xs: 1, sm: 2, md: 3 }} teaseNext={false}>
      <Karuselli.LeftArrow component={<Arrow isLeft><i className="fa fa-angle-left" /></Arrow>} />
      <Karuselli.RightArrow component={<Arrow isRight><i className="fa fa-angle-right" /></Arrow>} />

      <Karuselli.Items>
        {_.map(IMAGES, i => (
          <ImgWrapper key={i}>
            <Img src={i} />
          </ImgWrapper>
        ))}
      </Karuselli.Items>
    </Karuselli>
  </div>
)
