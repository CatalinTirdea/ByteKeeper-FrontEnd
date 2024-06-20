<div>
<h2>{formTitle}</h2>
<form onSubmit={handleSubmit}>
  <label>
    Name:
    <input type="text" name="name" value={inventoryItem.name} onChange={handleChange} required />
  </label>
  <label>
    Quantity:
    <input type="number" name="quantity" value={inventoryItem.quantity} onChange={handleChange} required />
  </label>
  <label>
    Price:
    <input type="number" name="price" value={inventoryItem.price} onChange={handleChange} required />
  </label>
  <label>
    Category:
    <select name="categoryId" value={inventoryItem.categoryId} onChange={handleChange} required>
      <option value="1">Category 1</option> {/* Example categories */}
      <option value="2">Category 2</option>
    </select>
  </label>
  <button type="submit">Save</button>
</form>
</div>