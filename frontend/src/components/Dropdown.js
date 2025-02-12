import { Select, MenuItem } from "@mui/material";

const Dropdown = ({ label, options, value, onChange }) => (
  <div>
    <label>{label}</label>
    <Select value={value} onChange={onChange} fullWidth>
      {options.map((opt) => (
        <MenuItem key={opt.id} value={opt.id}>
          {opt.name}
        </MenuItem>
      ))}
    </Select>
  </div>
);

export default Dropdown;
