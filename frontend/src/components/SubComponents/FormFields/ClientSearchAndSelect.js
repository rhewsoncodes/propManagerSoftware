import React from "react";
import Select from "react-select";

const ClientSearchAndSelect = ({ clients, type, client, setClient }) => {
  const clientInput = clients.map((client) => ({
    label: `${client.firstName} ${client.lastName}`,
    value: client.uuid,
  }));

  function compare(name1, name2) {
    if (name1.label < name2.label) {
      return -1;
    } else if (name1.label > name2.label) {
      return 1;
    } else {
      return 0;
    }
  }

  clientInput.sort(compare);

  console.log(clientInput);
  return (
    <>
      <span>Select Owner:</span>
      <Select
        id={type}
        options={clientInput}
        onChange={(e) => setClient(e.value)}
        styles={{
          option: (baseStyles) => ({
            ...baseStyles,
            color: "black",
          }),
        }}
      />
    </>
  );
};

export default ClientSearchAndSelect;
