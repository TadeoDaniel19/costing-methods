import { Button, Input } from "@material-tailwind/react";
import React from "react";

const DynamicInputs = (props: any) => {
  const { users, setUsers } = props;

  const addClick = () => {
    setUsers((prevUsers: any) => [...prevUsers, { activity: "", variableCost: "" }]);
  };

  const handleChange = (i: any, e: any) => {
    const { name, value } = e.target;
    let updatedUsers = [...users];
    updatedUsers[i] = { ...updatedUsers[i], [name]: value };
    setUsers(updatedUsers);
  };

  const removeClick = (i:number) => {
    let updatedUsers = [...users];
    updatedUsers.splice(i, 1);
    setUsers(updatedUsers);
  };

  return (
    <div>
      {users?.map((el: any, i:number) => (
        <div key={i} className="flex flex-row gap-3">
          <div className="w-1/4">
            <Input
              label={`Actividad ${i + 1}`}
              name="activity"
              value={el.activity || ""}
              color="purple"
              onChange={e => handleChange(i, e)}
            />
          </div>
          <div className="w-1/4">
            <Input
              label={`Costo variable ${i + 1}`}
              name="variableCost"
              value={el.variableCost || ""}
              color="purple"
              type="number"
              onChange={e => handleChange(i, e)}
            />
          </div>
          <Button variant="text" onClick={() => removeClick(i)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9M9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </Button>
          {
            i === (users.length - 1) && (
              <Button color="green" variant="text" onClick={addClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

              </Button>
            )
          }
        </div>
      ))}
      {
        !users?.length && (
          <Button color="purple" variant="text" onClick={addClick}>Agregar Costo</Button>
        )
      }
    </div>
  );
};

DynamicInputs.defaultProps = {
  users: [{ activity: "", variableCost: "" }],
  submitList: [],
  setUsers: () => { },

};

export default DynamicInputs;