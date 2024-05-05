
# Dashboard frontend

This is a project given as an assignment, its the frontend part of the assignment made with framework "NEXT.js" and written in ts/tsx




# Docs

This will display the main content, starting with the "/" its just a basic "go to login page" buttton. On "/login" user can login and signup both on the same page by changing the form. 
## Signup
Once signup, user will be retirected to "/2fa" to scan the qr code and get the authentication code using any authentication app. User must enter the code to continue.
## Login
To login user will have to enter the username and password and the 2FA code

## Dashboard
After a successful login or signup user will come to "/dashboard", this page uses an api to get the user logs and display them. It will contain the current device and all the other devices that are currently login or were active on other devices, with the timestamp of last login.
This page also gives access to the current user to log out from the other devices.
Since this page is live, anytime someoen will login or logout. It will be updated on this page in real time.



# Apis used

# login
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required** |
| `Password` | `string` | **Required** |

# signup
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Username` | `string` | **Required** |
| `Password` | `string` | **Required** |
| `2FA` | `number` | **Required** |

# qrImage
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| null | null | This will return a qr code image for authentication |

# dashboard
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| null | null | This will return all the logs of the current user |

# signout
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `log` | `string` | **Required** log will be the data of the device to be signout, This log is included by script on its own |


# Additional libraries  

- ua-parser-js: To format the user's device information.  
- socket.io-client: To get the real-time update of user activity.
## Directory

 ```
 root
 |
 |--.next
 |--node_modules
 |--public
 |--src
    |--app
       |--2fa
         |-page.tsx
       |--components
            |--loginForm
               |-login.css
               |-login.ts
               |-loginForm.jsx
            |--dashboard
              |-header.tsx
              |-main_content.tsx
       |--dashboard
          |-dashboard.css
          |-page.tsx     
       |--login
          |-page.tsx
       |--ui
          |-home.module.css
       |-apis.json
       |-global.css
       |-layout.tsx
       |-page.tsx
 |-.eslintrc.json
 |-.gitignore
 |-next-env.d.ts
 |-next.config.mjs
 |-package-lock.json
 |-package.json
 |Readme.md
 |-tsconfig.json