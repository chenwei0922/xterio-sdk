import Cookies from 'js-cookie'
import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { getAuthorizitionTokenByCode, getUserProfile } from 'src/services/user'
import { OAuthTokens, UserProfile } from 'src/services/user/interfaces'
class UserStore {
  userInfo = {} as UserProfile
  authTokens = {} as OAuthTokens
  accessToken = ''
  authorizationCode = ''
  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.authorizationCode,
      // 当 authorizationCode 改变时触发请求 token
      (authorizationCode) => {
        if (authorizationCode) {
          this.getAuthorizitionTokenByCode(authorizationCode)
        }
      }
    )
  }

  setUserInfo = (userInfo) => {
    this.userInfo = userInfo
  }

  setAuthorizationCode(authorizationCode: string) {
    this.authorizationCode = authorizationCode
  }

  setAuthToken(access_token) {
    Cookies.set('access_token', access_token)
    Cookies.set(
      'access_token',
      'eyJraWQiOiJwaTM1dTlTZjFGXC9YU1BcL1wvMlRKZlJkRm14YXNaaHVZeXcrbEl2MVp3RGc0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5MDIzYzUzOS02NzViLTRkYzgtOTYzZi1jMjJkYTcwN2FlNzYiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1FDSXpQMDB2ViIsImNvZ25pdG86dXNlcm5hbWUiOiI5MDIzYzUzOS02NzViLTRkYzgtOTYzZi1jMjJkYTcwN2FlNzYiLCJvcmlnaW5fanRpIjoiNDRmM2RjYjItYzM0Yy00Y2Q1LTg2MjEtNzE0NTc0YjY5ODJlIiwiYXVkIjoiNGdzbWd1cjZna3A4dTlwczhkbGNvM2s3ZW8iLCJldmVudF9pZCI6IjkwZWViNDVhLWVlYWYtNDdjMy05NWFmLTVkNWMwYzg4YmUxYiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzIzNjM2NTYxLCJleHAiOjE3MjM3MjI5NjAsImlhdCI6MTcyMzYzNjU2MSwianRpIjoiNjc5ZmFmZTEtMjFiNS00NTdhLWI0NjYtYmI5MTY1ZDRiMTQ1In0.WEAmRh7VR0dHf4JjAa2m77p1kjk-SJVIJvxgCu98KrdUQ9MnTNJ9oVd4qN9G4dvm8apQdSFREAUFLBOdgVMoUWurfj6VNWLvT6rEz85zpbFsFu84iAn4zmG66YppMjRMKhS111tA0dPOBOz5Kwcj5kYyUeHXPLszINRIttmAH8g1nsV-6u0hWLLVz38xICZLhwhhKRFCKMqbutT4R4OdoTdFz0xZpuEjY2ct1vCEqbinh5fk8tJz_QECAtcotJs8NnvGWLmKLmXiglHEcr3oEPUVP4x7oZ2BGoJt84z9_6l4p5GRb5N8JEb8rHETzTjShD-GXKbSr0HLHzIR4KOddA'
    )
    this.accessToken = access_token
  }

  getAuthorizitionTokenByCode = async (authorizationCode) => {
    const res = await getAuthorizitionTokenByCode(authorizationCode)
    if (res?.data) {
      runInAction(() => {
        this.authTokens = res?.data
        const { access_token, id_token, refresh_token } = res?.data || {}
        if (access_token) {
          this.setAuthToken(access_token)
        }
      })
    }
  }

  getUserProfile = async () => {
    const res = await getUserProfile()
    if (res?.data) {
      runInAction(() => {
        console.log(res?.data)
        this.userInfo = res?.data
      })
    }
  }
}

const userStore = new UserStore()

export default userStore
