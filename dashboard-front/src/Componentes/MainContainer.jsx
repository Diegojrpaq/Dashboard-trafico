import React from 'react'
import '../Css/MainContainer.css'
import { Routes, Route } from 'react-router-dom';
import { routes_secondary, routes_primary } from '../routes'
export default function MainContainer() {
  return (
    <Routes>
      {
        routes_secondary.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                name={route.name}
                element={<route.element/>}
              />
            )
          )
        })
      }
    </Routes>
  )
}
