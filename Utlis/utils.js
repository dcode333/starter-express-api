const realEstateData = require('../Models/properties'); // Import your Mongoose schema

// Function to handle saving or updating documents
async function saveOrUpdateProperties(dataArray) {
  const idsToUpdate = []; // Store IDs of documents to update

  const existingDocuments = await realEstateData.find({ PropertyId: { $in: dataArray.map(data => data.id) } });

  for (const data of dataArray) {
    const { id, description, price } = data;

    const existingDocument = existingDocuments.find(doc => doc.PropertyId === id);

    if (!existingDocument) {
      await realEstateData.create({
        PropertyId: id,
        Description: description,
        PriceOld: price?.trim(),
        PriceNew: price?.trim(),
        UpdatedOn: new Date().toLocaleDateString(),
        Reference: 'https://www.pisos.com' + data.href
      });
    } else if (existingDocument.PriceNew !== price?.trim()) {
      // console.log(existingDocument.PriceNew, " ", price)
      existingDocument.PriceOld = existingDocument.PriceNew;
      existingDocument.PriceNew = price?.trim();
      existingDocument.UpdatedOn = new Date().toLocaleDateString();
      await existingDocument.save();
      idsToUpdate.push(id); // Store IDs for batch update
    }
  }

  // Batch update to set UpdatedOn for multiple documents
  if (idsToUpdate.length > 0) {
    await realEstateData.updateMany(
      { PropertyId: { $in: idsToUpdate } },
      { $set: { UpdatedOn: new Date().toLocaleDateString() } }
    );
  }
}

async function isaveOrUpdateProperties(dataArray) {
  const idsToUpdate = []; // Store IDs of documents to update

  const existingDocuments = await realEstateData.find({ PropertyId: { $in: dataArray.map(data => data.id) } });

  for (const data of dataArray) {
    const { id, title, price, href } = data;

    const existingDocument = existingDocuments.find(doc => doc.PropertyId === id);

    if (!existingDocument) {
      await realEstateData.create({
        PropertyId: id,
        Description: title,
        PriceOld: price?.trim(),
        PriceNew: price?.trim(),
        UpdatedOn: new Date().toLocaleDateString(),
        Reference: 'https://www.idealista.com' + href
      });
    } else if (existingDocument.PriceNew !== price?.trim()) {
      // console.log(existingDocument.PriceNew, " ", price)
      existingDocument.PriceOld = existingDocument.PriceNew;
      existingDocument.PriceNew = price?.trim();
      existingDocument.UpdatedOn = new Date().toLocaleDateString();
      await existingDocument.save();
      idsToUpdate.push(id); // Store IDs for batch update
    }
  }

  // Batch update to set UpdatedOn for multiple documents
  if (idsToUpdate.length > 0) {
    await realEstateData.updateMany(
      { PropertyId: { $in: idsToUpdate } },
      { $set: { UpdatedOn: new Date().toLocaleDateString() } }
    );
  }
}



module.exports = { saveOrUpdateProperties, isaveOrUpdateProperties };

