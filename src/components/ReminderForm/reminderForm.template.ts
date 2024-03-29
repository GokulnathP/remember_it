export default `
    <h2></h2>
    <div class="input-item">
        <label for="title-input">Title</label>
        <input type="text" placeholder="Title here" id="title-input" required/>
    </div>
    <div class="input-item">
        <label for="link-input">Link</label>
        <input type="url" placeholder="Link here" id="link-input" required/>
    </div>
    <div class="form-actions">
        <button type="button" id="reminder-form-cancel" class="btn danger-btn">Cancel</button>
        <button type="submit" id="reminder-form-submit" class="btn success-btn">Submit</button>
    </div>
`;