/* eslint-disable */
const konstaConfig = require('konsta/config')
const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        jwhite: '#fff',
        jblue: 'rgba(147, 170, 255, 1)',
        jred: 'rgba(201, 77, 43, 1)',
        jyellow: 'rgba(255, 223, 47, 1)',
        jgreen: 'rgba(46, 208, 65, 1)',
        jgrey: 'rgba(172, 171, 171, 1)',
        jnav: '#ccc4f1',
        jcardbg: 'rgba(0, 0, 0, 0.3)',
        'btn-primary': 'rgba(53, 9, 9, 1)'
      },
      screens: {
        // 手机端优先，其他端如下
        //tablet
        tb: '640px',
        // => @media (min-width: 640px) { ... }

        //laptop
        lp: '1024px',
        // => @media (min-width: 1024px) { ... }

        //desktop
        pc: '1280px',
        // => @media (min-width: 1280px) { ... }
        // short height
        short: { raw: '(max-height: 800px)' },
        // xtra short height
        xshort: { raw: '(max-height: 700px)' },
        // xtra short height
        xsshort: { raw: '(max-height: 650px)' }
      },
      fontFamily: {
        bahnschrift: ['Bahnschrift'],
        sansmono: ['droid-sans-mono']
      },
      boxShadow: {
        modal: '-2px -61px 259px -1px rgba(109,148,248,0.75)'
      },
      backgroundImage: (theme) => ({
        modal: 'linear-gradient(180deg, rgba(42, 45, 71, 1) 0%, rgba(109, 118, 147, 1) 100%)',
        card: 'linear-gradient(180deg,#402880, #292E56, #6457B8)'
      })
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        'flex-center-col': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        },
        '.flex-between': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        },
        '.flex-around': {
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }
      })
    })
  ]
}

module.exports = konstaConfig(config)
