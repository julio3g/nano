import { ThemeToggle } from '@/components/theme-switcher'

import { EmployeesForm } from './employees-form'

export default function CreateEmployees() {
  return (
    <>
      <h1>Create a new employees</h1>
      <EmployeesForm />
      <div className="p-4">
        <ThemeToggle />
      </div>
    </>
  )
}
