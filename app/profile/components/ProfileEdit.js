export default function ProfileEdit({
  formFirstName,
  formLastName,
  formEmail,
  onChange,
  onImageChange,
  onCancel,
  onSubmit,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-5"
    >
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="block w-full text-sm"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={formFirstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formLastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      <input
        type="email"
        placeholder="Email"
        value={formEmail}
        onChange={(e) => onChange("email", e.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-green-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
}
