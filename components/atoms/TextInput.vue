<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: 'Sample text',
  },
  name: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 5,
  },
  req: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:value']);
</script>

<template>
  <div>
    <textarea
      v-if="type == 'textarea'"
      :id="name"
      :name="name"
      :placeholder="label"
      :rows="rows"
      :required="req"
      :value="value"
      @input="emit('update:value', $event.target.value)"
    ></textarea>
    <input
      v-else
      :id="name"
      :name="name"
      :placeholder="label"
      :type="type"
      :required="req"
      :value="value"
      @input="emit('update:value', $event.target.value)"
    />
    <label :for="name">{{ label }}</label>
  </div>
</template>

<style lang="postcss" scoped>
div {
  margin-bottom: 2rem;
  position: relative;

  label {
    font-size: 1rem;
    position: absolute;
    margin-left: 0.6rem;
    padding: 0 0.2rem;
    left: 0;
    transform-origin: top left;
    transform: translate(0, 1.05rem) scale(1);

    /* speed */
    transition: all 0.1s ease-out;

    color: rgba(var(--rgbText), 1);
  }

  input,
  textarea {
    font-size: 1rem;
    outline: 0;
    padding: 1rem 0.8rem;
    width: 100%;

    background: var(--background);

    color: rgba(var(--rgbText), 0.6);
    border-radius: 0.25rem;
    border: 1px solid rgba(var(--rgbText), 0.5);

    /* focused */
    &:focus {
      color: rgba(var(--rgbText), 0.87);
      border-color: var(--primary);

      & ~ label {
        color: var(--primary);
      }
    }

    /* placeholder base */
    &::placeholder {
      opacity: 0;
      color: rgba(var(--rgbText), 0.6);
      transition: all 0.1s ease-out;
    }

    /* show placeholder top on focus */
    &:focus::placeholder {
      opacity: 1;
    }

    /* error */
    &:focus:invalid {
      border-color: var(--error);

      & ~ label {
        color: var(--error);
      }
    }

    /* if label active or text is filled */
    &:focus ~ label,
    &:not(:placeholder-shown) ~ label {
      transform: translateY(-0.35rem) scale(0.75);
      background-color: var(--background);
    }
  }

  /* input { } */

  textarea {
    resize: none;
  }
}
</style>
