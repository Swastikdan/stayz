  const password = '$2a$12$zwPEI7Bn9kAyADJlwA6UMeKMPJfsvkLb4Y1cNhVxbk95cRXJimbBu'
    const hashedPassword = await bcrypt.hash(password, 12);