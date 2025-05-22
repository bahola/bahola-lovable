
  // Only updating the getInitialValues function
  const getInitialValues = useCallback(() => {
    if (!initialProduct) return defaultValues;
    
    try {
      console.log('Setting up form with initial product:', initialProduct);
      
      // Parse dimensions string if exists
      let dimensionsObj = { length: 0, width: 0, height: 0 };
      if (initialProduct.dimensions) {
        try {
          const [length, width, height] = initialProduct.dimensions.split('/').map(Number);
          dimensionsObj = { length: isNaN(length) ? 0 : length, width: isNaN(width) ? 0 : width, height: isNaN(height) ? 0 : height };
        } catch (e) {
          console.error('Error parsing dimensions:', e);
        }
      }
      
      // Set product ID for editing
      setProductId(initialProduct.id);
      
      // Set potencies and pack sizes if they exist
      const potencies = initialProduct.potencies || [];
      const packSizes = initialProduct.pack_sizes || [];
      
      // Set variations if available
      let formattedVariations: ProductVariation[] = [];
      if (initialProduct.product_variations && initialProduct.product_variations.length > 0) {
        formattedVariations = initialProduct.product_variations.map((v: any) => ({
          potency: v.potency || '',
          packSize: v.pack_size || '',
          price: v.price || 0,
          stock: v.stock || 0,
          weight: v.weight || 0,
        }));
      }
      
      // Set image URLs if available
      const imageUrlsValue = initialProduct.image ? [initialProduct.image] : [];
      
      // Return formatted initial values
      return {
        name: initialProduct.name || "",
        type: initialProduct.type || "simple",
        description: initialProduct.description || "",
        shortDescription: "", // Using an empty string since there's no short_description in database
        stock: initialProduct.stock || 0,
        hsnCode: initialProduct.hsn_code || "",
        price: initialProduct.price || 0,
        category: initialProduct.category_id || "",
        subcategory: initialProduct.subcategory_id || "", // Added subcategory field
        weight: initialProduct.weight || 0,
        dimensions: dimensionsObj,
        taxStatus: initialProduct.tax_status || "taxable",
        taxClass: initialProduct.tax_class || "5",
        potencies: potencies,
        packSizes: packSizes,
        variations: formattedVariations,
        upsellProducts: initialProduct.upsell_products || [],
        crossSellProducts: initialProduct.cross_sell_products || [],
      };
    } catch (error) {
      console.error('Error initializing form with product data:', error);
      return defaultValues;
    }
  }, [initialProduct]);
