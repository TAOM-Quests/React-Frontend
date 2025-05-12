import { EmployeeAuth, UserAuth } from '../../../../models/userAuth'

export const user: UserAuth = {
  id: 1,
  email: 'marika.meidra@gmail.com',
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDQwMzM2NDYsImV4cCI6MTc3NTU2OTY0NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.mOqkMMeQo5X3hezKCeemDnBuoKljKJ9TCHxXBHlYBJg',
  name: '',
}

export const employee: EmployeeAuth = {
  id: 2,
  email: 'roman.nichi@gmail.com',
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDQwMzM2NDYsImV4cCI6MTc3NTU2OTY0NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.SH70p7sY0GjWY9f6wrhaYxZHE_qRqImb0nFsmGqELvs',
  isEmployee: true,
  roleId: 2,
  position: '',
  departmentId: 1,
  name: '',
}
