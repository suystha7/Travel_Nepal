import React from "react"
import { useFormikContext, getIn } from "formik"
import { BookingValidationSchemaType } from "../schema/bookingValidationSchema"

type InputProps = {
  name: string
  label: string
  type: string
}

const InputField = ({ name, label, type }: InputProps) => {
  const { handleChange, handleBlur, values, errors, touched } =
    useFormikContext<BookingValidationSchemaType>()

  const error = getIn(errors, name)
  const isTouched = getIn(touched, name)
  const value = getIn(values, name)

  return (
    <div className="flex flex-col gap-1">
      <div className="relative border-b-2 border-gray-200 focus-within:border-primary-500 transition-all">
        <input
          id={name}
          name={name}
          type={type}
          value={value || ""}
          placeholder=" "
          onChange={handleChange}
          onBlur={handleBlur}
          className="peer w-full bg-transparent pt-6 pb-2 text-gray-900 outline-none placeholder-transparent"
        />

        <label
          htmlFor={name}
          className="absolute left-0 top-6 text-gray-400 font-medium transition-all pointer-events-none
          peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary-500
          peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </label>
      </div>

      {isTouched && error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  )
}

const Step1Form = () => {
  const { values } = useFormikContext<BookingValidationSchemaType>()

  return (
    <div className="space-y-10">
      <h2 className="typography-sub-h2-medium text-grey-800 pb-5">
        Traveller Details
      </h2>

      {values.adults.map((_, index) => (
        <div key={index} className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Adult {index + 1}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              name={`adults[${index}].first_name`}
              label="First Name"
              type="text"
            />

            <InputField
              name={`adults[${index}].last_name`}
              label="Last Name"
              type="text"
            />

            <InputField
              name={`adults[${index}].email`}
              label="Email Address"
              type="email"
            />

            <InputField
              name={`adults[${index}].phone`}
              label="Phone Number"
              type="tel"
            />

            <InputField
              name={`adults[${index}].passport_number`}
              label="Passport Number"
              type="text"
            />

            <InputField
              name={`adults[${index}].nationality`}
              label="Nationality"
              type="text"
            />
          </div>
        </div>
      ))}

      {values.children?.length > 0 && (
        <div className="space-y-6">
          <h2 className="typography-sub-h2-medium text-grey-800">
            Children Details
          </h2>

          {values.children.map((_, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                name={`children[${index}].first_name`}
                label="First Name"
                type="text"
              />

              <InputField
                name={`children[${index}].last_name`}
                label="Last Name"
                type="text"
              />

              <InputField
                name={`children[${index}].date_of_birth`}
                label="Date of Birth"
                type="date"
              />

              <InputField
                name={`children[${index}].nationality`}
                label="Nationality"
                type="text"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Step1Form