<script setup>
import { Field } from 'vee-validate'
</script>

<template>
  <Field as="input" class="w-full rounded-md border border-gray-300 p-2"><slot></slot></Field>
</template>
