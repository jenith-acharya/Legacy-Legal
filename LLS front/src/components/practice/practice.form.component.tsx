import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  InputLabel,
  TextInputComponent,
  SubmitButton,
  CancelButton
} from "../common/form/input.component";
import { FaPaperPlane, FaUndo } from "react-icons/fa";

const PracticeFormComponent = ({ details, submitEvent, loading }: {details?:any, submitEvent: any; loading: boolean }) => {

  const practiceDTO = Yup.object({
    title: Yup.string().min(3).max(150).required(),
    status: Yup.string().required(),
    image: Yup.mixed().optional().default(null),
    description: Yup.string().min(10).max(5000).required(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(practiceDTO),
  });

  return (
    <>
      <form onSubmit={handleSubmit(submitEvent)}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

          {/* Title */}
          <div className="sm:col-span-2">
            <InputLabel htmlFor="title">Title:</InputLabel>
            <TextInputComponent
              name="title"
              control={control}
              errMsg={errors?.title?.message}
            />
          </div>


          {/* Image Upload */}
          <div className="sm:col-span-2">
            <InputLabel htmlFor="image">Image:</InputLabel>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              type="file"
              onChange={(e: any) => {
                const image = e.target.files[0];
                setValue("image", image);
              }}
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <InputLabel htmlFor="description">Description:</InputLabel>
            <textarea
              id="description"
              rows={10}
              {...register("description")}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Your description here"
            />
            {errors?.description && (
              <p className="text-red-500 text-xs">{errors.description.message}</p>
            )}
          </div>
        </div>
        <br />

        {/* Submit and Cancel Buttons */}
        <SubmitButton loading={loading}>
          <FaPaperPlane className="me-3" /> Add Practice
        </SubmitButton>

        <CancelButton loading={loading}>
          <FaUndo className="me-3" /> Cancel
        </CancelButton>
      </form>
    </>
  );
};

export default PracticeFormComponent;
