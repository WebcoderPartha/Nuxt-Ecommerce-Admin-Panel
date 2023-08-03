<template>
  <div>
    <div class="border rounded-md border-zinc-300 p-4 max-w-[400px]">
      <h2 class="text-2xl font-semibold mb-3">Shipping Address</h2>
      <form>
        <div class="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Address line one"
            class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
          />
          <input
            type="text"
            placeholder="Address line two"
            class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
          />
          <div class="flex gap-2">
            <input
              type="text"
              placeholder="Area / Thana"
              class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
            />
            <input
              type="text"
              placeholder="Zip Code"
              class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
            />
          </div>
          <div class="flex gap-2">
            <input
              type="text"
              placeholder="City"
              class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
            />
            <input
              type="text"
              placeholder="Country"
              class="bg-gray-100 rounded-md focus:outline-none px-4 py-1 w-full text-gray-400"
            />
          </div>
          <button class=" bg-zinc-950 text-white px-3 py-1 rounded-sm cursor-pointer" type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
