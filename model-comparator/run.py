#!/usr/bin/env python3
"""
Simple runner script for the LLM comparison system
"""

import asyncio
from compare_llm.compare_llm import main

if __name__ == "__main__":
    asyncio.run(main())
