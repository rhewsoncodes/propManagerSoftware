const CityFormField = ({ city, setCity }) => {
  return (
    <>
      <label id="citylabel" htmlFor="city">
        City:
      </label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
    </>
  );
};

export default CityFormField;
